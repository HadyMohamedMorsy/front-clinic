export interface Appointments {
  _id: string;
  day: string;
  note: string;
  status: string;
  name: string;
  created_by: string;
  createdAt: string;
}

export class AppointmentsModel {
  patient: string | null;
  day: Date | null;
  day_consultation: Date | null;
  paid: number | null;
  price: number | null;
  note: string | null;
  constructor(editData: Partial<AppointmentsModel> & { id: string }) {
    this.patient = editData?.id || null;
    this.day = editData?.day || null;
    this.day_consultation = editData?.day_consultation || null;
    this.paid = editData?.paid || null;
    this.price = editData?.price || null;
    this.note = editData?.note || null;
  }
}
