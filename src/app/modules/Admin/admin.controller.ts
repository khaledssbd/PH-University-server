/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AdminServices } from './admin.service';

const getAllAdmins = catchAsync(async (req, res) => {
  const result = await AdminServices.getAllAdminsFromDB(req.query);

  sendResponse<any>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admins are retrieved successfully!',
    meta: result.meta,
    data: result.result,
  });
});

const getSingleAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AdminServices.getSingleAdminFromDB(id);

  sendResponse<any>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is retrieved succesfully!',
    data: result,
  });
});

const updateAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { admin } = req.body;
  const result = await AdminServices.updateAdminIntoDB(id, admin);

  sendResponse<any>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is updated succesfully!',
    data: result,
  });
});

const deleteAdmin = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AdminServices.deleteAdminFromDB(id);

  sendResponse<any>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is deleted succesfully!',
    data: result,
  });
});

export const AdminControllers = {
  getAllAdmins,
  getSingleAdmin,
  deleteAdmin,
  updateAdmin,
};
