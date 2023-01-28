import { number } from "joi";
import mongoose, { Schema, Document, Types } from "mongoose";

interface IconsolidatedGeneralMaster {
  description: string;
  code: number;
  value: string;
}

const consolidatedGeneralMasterSchema: Schema =
  new Schema<IconsolidatedGeneralMaster>(
    {
      description: { type: String },
      code: { type: Number },
      value: { type: String },
    },
    { collection: "consolidatedGeneralMaster", versionKey: false }
  );
const ConsolidatedGeneralMaster = mongoose.model<IconsolidatedGeneralMaster>(
  "ConsolidatedGeneralMaster",
  consolidatedGeneralMasterSchema
);
export { ConsolidatedGeneralMaster, IconsolidatedGeneralMaster };
