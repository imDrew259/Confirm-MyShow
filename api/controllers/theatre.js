const Razorpay = require("razorpay");
const shortid = require("shortid");

const Show = require("../models/show");
const Theatre = require("../models/theatre");

exports.postTheatre = (req, res, next) => {
  return Show.findOne({ theatreId: req.id, showId: req.body.showId })
    .then((show) => {
      if (!show) {
        const newShowItem = new Show({
          theatreId: req.id,
          showId: req.body.showId,
          showDetails: req.body.showDetails,
        });
        return newShowItem.save();
      } else {
        show.showDetails = req.body.showDetails;
        return show.save();
      }
    })
    .then((show) => {
      return res.status(200).json({ message: "Successfully Added!!" });
    })
    .catch((err) => {
      const error = new Error("Server Error");
      error.data = [{ msg: err.message }];
      error.status = 500;
      next(error);
    });
};

exports.getTheatre = (req, res, next) => {
  return Show.find({ showId: req.params.showId })
    .populate("theatreId", { password: 0, email: 0 })
    .then((shows) => {
      const error = new Error();
      if (shows.length === 0) {
        return res
          .status(200)
          .json({ data: null, message: "No theatre found" });
      } else {
        return res.status(200).json({ data: shows, message: "Theatres Found" });
      }
    })
    .catch((err) => {
      if (!err.status) err.status = 500;
      err.message = "Server Error";
      err.data = [{ msg: "Fetching Theatres Failed!!" }];
      next(err);
    });
};

exports.seatsStatus = (req, res, next) => {
  Show.findOne({
    showId: req.body.movieId,
    theatreId: req.body.theatreId,
  })
    .then((doc) => {
      return doc.showDetails.find((showDetail) => {
        if (showDetail.date === req.body.date) return showDetail;
      });
    })
    .then((show) => {
      const index = show.time.indexOf(req.body.time);
      if (!show.seatsBooked) {
        return res.status(200).json({
          data: null,
          message: "Data successfullt retrieved",
        });
      } else {
        return res.status(200).json({
          data: show.seatsBooked[index],
          message: "Data successfullt retrieved",
        });
      }
    })
    .catch((err) => {
      if (!err.status) err.status = 500;
      next(err);
    });
};

exports.bookTicket = (req, res, next) => {
  Show.findOne({
    showId: req.body.movieId,
    theatreId: req.body.theatreId,
  })
    .then((doc) => {
      let seatsBooked;
      let dataIndex;
      let data;
      const error = new Error();
      data = doc.showDetails.map((showDetail, index) => {
        if (showDetail.date === req.body.date) {
          const timeIndex = showDetail.time.indexOf(req.body.time);
          const langIndex = showDetail.lang.indexOf(req.body.lang);
          if (timeIndex === langIndex) {
            seatsBooked = {
              executiveSeats: req.body.executiveSeats,
              premiumSeats: req.body.premiumSeats,
            };
            if (!doc.showDetails[index].seatsBooked) {
              doc.showDetails[index].seatsBooked = [];
              doc.showDetails[index].seatsBooked[timeIndex] = seatsBooked;
            } else if (
              doc.showDetails[index].seatsBooked &&
              !doc.showDetails[index].seatsBooked[timeIndex]
            ) {
              doc.showDetails[index].seatsBooked[timeIndex] = seatsBooked;
            } else {
              let text = req.body.executiveSeats;
              let text2 = showDetail.seatsBooked[timeIndex].executiveSeats;
              let result = req.body.executiveSeats.filter((t) =>
                showDetail.seatsBooked[timeIndex].executiveSeats.includes(t)
              );

              if (!result[0]) {
                const ps = req.body.premiumSeats.filter((seat) =>
                  showDetail.seatsBooked[timeIndex].premiumSeats.includes(seat)
                );
                if (!ps[0]) {
                  doc.showDetails[index].seatsBooked[
                    timeIndex
                  ].executiveSeats.push(...req.body.executiveSeats);
                  doc.showDetails[index].seatsBooked[
                    timeIndex
                  ].premiumSeats.push(...req.body.premiumSeats);
                } else {
                  error.status = 422;
                  error.message = "Please Reselect your seats";
                  error.data = [
                    { msg: `Selected Seat ${ps[0]} is not available` },
                  ];
                  throw error;
                }
              } else {
                error.status = 422;
                error.message = "Please Reselect your seats";
                error.data = [
                  { msg: `Selected Seat ${result[0]} is not available` },
                ];
                throw error;
              }
            }
            dataIndex = index;
            doc.markModified("showDetails");
            return doc.save();
          }
        }
      });
      return data[dataIndex];
    })
    .then((doc) => {
      doc.save();
      if (doc)
        res.status(200).json({ data: doc, message: "Successfully Booked" });
      else {
        const error = new Error("Booking Failed");
        error.status(500);
        error.data = [{ msg: "Theatre slot not found" }];
        throw error;
      }
    })
    .catch((err) => {
      next(err);
    });
};

exports.generateRazorpayId = (req, res, next) => {
  const options = {
    amount: req.body.amount * 100,
    currency: req.body.currency,
    receipt: shortid.generate(),
  };
  const instance = new Razorpay({
    key_id: process.env.RazorpayKeyId,
    key_secret: process.env.RazorpaySecretKeyId,
  });
  instance.orders
    .create(options)
    .then((result) => {
      const data = {
        orderId: result.id,
        currency: result.currency,
        amount: result.amount,
      };
      res.status(200).json({ data, message: "OrderId succesfully generated" });
    })
    .catch((err) => {
      err.status = 500;
      err.data = [{ msg: "Generating OrderId Failed" }];
      next(err);
    });
};
