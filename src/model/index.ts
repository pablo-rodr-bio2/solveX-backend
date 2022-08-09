import { Model, DataTypes } from "sequelize"
import db from "../config/database.config"


interface QuoteAttributes {
  id: DataTypes.IntegerDataType
  quote: DataTypes.StringDataType
  author: DataTypes.StringDataType
}

export class QuoteInstance extends Model<QuoteAttributes> {}

QuoteInstance.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    quote: {
      type: DataTypes.STRING,
    },
    author: {
      type:DataTypes.STRING
    }
    
  },
  {
    sequelize: db,
    tableName: 'quotes',
    timestamps: false
  }
)