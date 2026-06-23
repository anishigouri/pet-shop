'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const appointmentSchema = z.object({
  tutorName: z.string(),
  petName: z.string(),
  phone: z.string(),
  description: z.string(),
  scheduleAt: z.date(),
});

type AppointmentData = z.infer<typeof appointmentSchema>;

export async function createAppointment(data: AppointmentData) {
  try {
    const parsedData = appointmentSchema.parse(data);

    const { scheduleAt } = parsedData;
    const hour = scheduleAt.getHours();

    const isMorning = hour >= 9 && hour < 12;

    const isAfternoon = hour >= 13 && hour < 18;

    const isEvening = hour >= 19 && hour < 21;

    if (!isMorning && !isAfternoon && !isEvening) {
      return {
        error:
          'Agendamentos só podem ser feitos das 9h às 12h, das 13h às 18h e das 19h às 21h',
      };
    }

    const existingAppointment = await prisma.appointment.findFirst({
      where: {
        scheduleAt,
      },
    });

    if (existingAppointment) {
      return { error: 'Este horário já está ocupado' };
    }

    await prisma.appointment.create({
      data: {
        ...parsedData,
      },
    });

    //Atualiza a página para refletir o novo agendamento
    revalidatePath('/');
  } catch (error) {
    console.error(error);
    return { error: 'Erro ao criar o agendamento' };
  }
}
