import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import AppError from '../errors/AppError';

interface Request {
  provider_id: string;
  date: Date;
}
class CreateAppointmentService {
  public async execute({ provider_id, date }: Request): Promise<Appointment> {
    const dateAppointmentStart = startOfHour(date);

    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const sameDateAppointments = await appointmentsRepository.findByDate(
      dateAppointmentStart,
    );

    if (sameDateAppointments) {
      throw new AppError('This Appointment is already booked! ', 409);
    }

    const appointment = appointmentsRepository.create({
      provider_id,
      date: dateAppointmentStart,
    });
    await appointmentsRepository.save(appointment);
    return appointment;
  }
}
export default CreateAppointmentService;
