export interface Patient {
  _id: string;
  name: string;
  number: string;
  age: number;
  note: string;
  diseases: string;
  totalPaid: number;
  totalPrice: number;
  totalRemain: number;
  created_by: string;
}

export class PatientModel {
  id?: string | null;
  name: string | null;
  number: string | null;
  age: number | null;
  note: string | null;
  diseases: string | null;
  constructor(editDate?: Partial<PatientModel> & { _id?: string }) {
    this.id = editDate?._id || null;
    this.name = editDate?.name || null;
    this.number = editDate?.number || null;
    this.age = editDate?.age || null;
    this.note = editDate?.note || null;
    this.diseases = editDate?.diseases || null;
  }
}
