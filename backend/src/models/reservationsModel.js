import { Schema, model } from "mongoose";

const reservationSchema = new Schema(
  {
    clientId: { 
      type: Schema.Types.ObjectId, 
      ref: "clients",
      required: true,  
    },
    vehicle: { 
      type: String, 
      required: true,  
    },
    service: { 
      type: String, 
      required: true,  
    },
    status: { 
      type: String, 
      enum: ['pendiente', 'confirmada', 'cancelada'], 
      required: true,  
    }
  },
  {
    timestamps: true, 
    strict: true,     
  }
);

export default model("Reservation", reservationSchema);