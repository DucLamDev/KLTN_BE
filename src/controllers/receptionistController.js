import {
  createReceptionistService,
  getListReceptionistsService,
  getOneReceptionistByIdService,
  updateReceptionistByIdService,
  deleteReceptionistByIdService,
  getReceptionistByEmail,
} from "../services/receptionistServices.js";
// Receptionist, receptionist
export const createReceptionistController = async (req, res) => {
  try {
    const newReceptionist = await createReceptionistService(req.body);
    res.status(201).json({
      success: true,
      message: "Receptionist created successfully",
      data: newReceptionist,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getListReceptionistsController = async (req, res) => {
  try {
    const { email } = req.query;
    if (email) {
      const receptionist = await getReceptionistByEmail(email);
      res.status(200).json(receptionist);
    } else {
      const receptionists = await getListReceptionistsService();
      res.status(200).json(receptionists);
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getOneReceptionistByIdController = async (req, res) => {
  try {
    const receptionist = await getOneReceptionistByIdService(req.params.id);
    res.status(200).json(receptionist);
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateReceptionistByIdController = async (req, res) => {
  try {
    const updatedReceptionist = await updateReceptionistByIdService(
      req.params.id,
      req.body
    );
    res.status(200).json({
      success: true,
      message: "Receptionist updated successfully",
      data: updatedReceptionist,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteReceptionistByIdController = async (req, res) => {
  try {
    await deleteReceptionistByIdService(req.params.id);
    res.status(200).json({
      success: true,
      message: "Receptionist deleted successfully",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};
