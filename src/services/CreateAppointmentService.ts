import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

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
      throw Error('This Appointment is already booked! ');
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
