import mongoose, { Schema, Document, Types } from "mongoose";

interface IStateType {
  typeRef: number;
  typeValue: string;
}
interface IDistricts {
  type: string;
  valueRef: number;
  value: string;
}
interface IStatesMaster {
  type: string;
  valueRef: number;
  value: string;
  mapRef?: number;
  districts?: IDistricts[];
}
const districtSchema: Schema = new Schema<IDistricts>({
  value: { type: String },
  type: { type: String },
  valueRef: { type: Number },
});
const statesMasterSchema: Schema = new Schema<IStatesMaster>(
  {
    value: { type: String },
    type: { type: String },
    valueRef: { type: Number },
    mapRef: { type: Number },
    districts: [districtSchema],
  },
  {
    collection: "statesMaster",
    versionKey: false,
  }
);

const StatesMaster = mongoose.model<IStatesMaster>(
  "statesMaster",
  statesMasterSchema
);
export { StatesMaster, IStatesMaster, IDistricts };
