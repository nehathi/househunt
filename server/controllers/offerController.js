const Offer = require("../models/Offer");
const Property = require("../models/Property");

// Send Offer
exports.sendOffer = async (req, res) => {
  try {
    const { propertyId, amount } = req.body;

    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    const offer = new Offer({
      property: propertyId,
      buyer: req.user.id,
      owner: property.owner,
      amount,
    });

    await offer.save();

    res.status(201).json({
      message: "Offer Sent Successfully",
      offer,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Get My Offers
exports.getMyOffers = async (req, res) => {
  try {
    const offers = await Offer.find({
      owner: req.user.id,
    })
      .populate("buyer", "name email")
      .populate("property", "title");

    res.json(offers);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Update Offer Status
exports.updateOffer = async (req, res) => {
  try {
    const offer = await Offer.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      },
      {
        new: true,
      }
    );

    res.json(offer);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};