import { Model, DataTypes } from "sequelize"
import db from "../config/database.config"


interface QuoteAttributes {
  id: string
  quote: string
  author: string
}

export class QuoteInstance extends Model<QuoteAttributes> {}

QuoteInstance.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    quote: {
      type: DataTypes.STRING,
    },
    author: {
      type:DataTypes.STRING,
    }
    
  },
  {
    sequelize: db,
    tableName: 'quotes',
    timestamps: false
  }
)