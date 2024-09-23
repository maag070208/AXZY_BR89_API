import { PatientDTO } from "@src/modules/patients/core/dto/patient.dto";

export const generatePaymentDates = (
  body: PatientDTO,
  id: number,
  existingPaymentDates: PaymentDateEDM[] = []
): PaymentDateEDM[] => {
  const startDate = new Date(body.startDate);
  const endDate = new Date(body.endDate);

  if (startDate > endDate) {
    throw new Error("La fecha de inicio debe ser anterior a la fecha de fin");
  }

  const paymentDates: PaymentDateEDM[] = [];

  let currentDate = new Date(startDate.getFullYear(), startDate.getMonth(), 1);

  while (currentDate <= endDate) {
    if (currentDate >= startDate && currentDate <= endDate) {
      const paymentDate = new Date(currentDate);
      const dueDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        15
      );

      const existingDate = existingPaymentDates.find(
        (date) =>
          date.startDate.getTime() === paymentDate.getTime() &&
          date.patientId === id
      );

      if (!existingDate) {
        paymentDates.push({
          startDate: paymentDate,
          endDate: dueDate,
          monthName: `${getMonthName(currentDate.getMonth())} ${currentDate.getFullYear()}`,
          month: currentDate.getMonth() + 1,
          status: "pending",
          patientId: id,
        });
      }
    }

    currentDate.setMonth(currentDate.getMonth() + 1);
  }

  return paymentDates;
};

export const getPaymentDatesOutDateRange = (
  startDate: Date,
  endDate: Date,
  paymentDates: PaymentDateEDM[]
): PaymentDateEDM[] => {
  return paymentDates.filter(
    (date) => date.startDate < startDate || date.endDate > endDate
  );
};

const getMonthName = (monthIndex: number): string => {
  const monthNames = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  return monthNames[monthIndex];
};
