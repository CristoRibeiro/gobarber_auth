import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();

appointmentsRouter.get('/', async (request, response) => {
  try {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointments = await appointmentsRepository.find();
    return response.json(appointments);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;
  try {
    const dateAppointment = parseISO(date);

    const appointmentService = new CreateAppointmentService();
    const appointment = await appointmentService.execute({
      date: dateAppointment,
      provider_id,
    });

    return response.json(appointment);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default appointmentsRouter;
