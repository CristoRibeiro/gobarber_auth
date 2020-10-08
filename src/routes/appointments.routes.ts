import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import AppError from '../errors/AppError';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);
appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);

  const appointments = await appointmentsRepository.findOne({
    where: { provider_id: request.user.id },
  });
  if (!appointments) {
    throw new AppError('Not appointments to list.', 404);
  }
  return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const dateAppointment = parseISO(date);

  const appointmentService = new CreateAppointmentService();
  const appointment = await appointmentService.execute({
    date: dateAppointment,
    provider_id,
  });

  return response.json(appointment);
});

export default appointmentsRouter;
