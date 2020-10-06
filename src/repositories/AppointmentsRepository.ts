import { EntityRepository, Repository } from 'typeorm';
import Appointment from '../models/appointment';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  public async findByDate(date: Date): Promise<Appointment | null> {
    const appointmentByDate = await this.findOne({
      where: { date },
    });

    return appointmentByDate || null;
  }
}
export default AppointmentsRepository;
