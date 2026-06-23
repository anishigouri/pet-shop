import { AppointmentForm } from '@/components/appointment-form/appointment-form';
import { PeriodSection } from '@/components/period-section/period-section';
import { prisma } from '@/lib/prisma';
import { APPOINTMENT_DATA, groupAppointmentByPeriod } from '@/utils';

export default async function Home() {
  const appointments = await prisma.appointment.findMany();

  console.log(appointments);

  const periods = groupAppointmentByPeriod(APPOINTMENT_DATA);
  return (
    <div className="bg-background-primary p-6">
      <div className="flex flex-col items-center justify-between mb-8">
        <div>
          <h1 className="text-title-size text-content-primary mb-2">
            Sua Agenda
          </h1>
          <p className="text-paragraph-medium-size text-content-secondary">
            Aqui você pode ver todos os clientes e serviços agendados para hoje.
          </p>
        </div>
        <div className="pb-24 md:pb-0 w-full">
          {periods.map((period, index) => (
            <PeriodSection period={period} key={index} />
          ))}
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 flex justify-center bg-[#23242C] py-[18px] px-6 md:bottom-6 md:right-6 md:left-auto md:top-auto md:w-auto md:bg-transparent md:p-0">
        <AppointmentForm />
      </div>
    </div>
  );
}
