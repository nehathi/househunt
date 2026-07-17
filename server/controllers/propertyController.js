const Property = require("../models/Property");

// Add Property
exports.addProperty = async (req, res) => {
  try {
    const property = new Property({
      ...req.body,
      owner: req.user.id,
    });

    await property.save();

    const savedProperty = await Property.findById(property._id).populate(
      "owner",
      "name email"
    );

    res.status(201).json(savedProperty);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get All Properties
exports.getProperties = async (req, res) => {
  try {
    const properties = await Property.find()
      .populate("owner", "name email")
      .sort({ createdAt: -1 });

    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get One Property
exports.getProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate(
      "owner",
      "name email"
    );

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    res.json(property);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Property
exports.updateProperty = async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    ).populate("owner", "name email");

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    res.json(property);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Property
exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    await Property.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Property Deleted Successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};