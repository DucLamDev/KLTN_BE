import ServiceList from '../models/ServiceList.js';

class ServiceListRepository {
  async createServiceList(data) {
    const serviceList = new ServiceList(data);
    await serviceList.save();
    return serviceList;
  }

  async getServiceListById(id) {
    return await ServiceList.findById(id).populate('doctorId patientId'); // Populate doctor and patient details
  }

  async getAllServiceLists() {
    return await ServiceList.find().populate('doctorId patientId'); // Populate doctor and patient details
  }

  async updateServiceList(id, data) {
    return await ServiceList.findByIdAndUpdate(id, data, { new: true }).populate('doctorId patientId'); // Populate doctor and patient details after update
  }

  async deleteServiceList(id) {
    return await ServiceList.findByIdAndDelete(id);
  }
}

export default ServiceListRepository;