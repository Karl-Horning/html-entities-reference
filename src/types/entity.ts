/** Represents a single HTML named character reference. */
export interface Entity {
  /** The Unicode code point as a byte value. Null when the code point exceeds 255 or the entity maps to multiple code points. */
  byte: number | null;
  /** One or more Unicode code points in decimal form. Most entities have one; 93 map to two. */
  dec: number[];
  /** One or more Unicode code points in hex form, e.g. `["U+00C1"]`. */
  hex: string[];
  /** The rendered character or characters, e.g. `Á`. */
  char: string;
  /** The decimal numeric character reference, e.g. `&#193;`. */
  htmlNumberDecimal: string;
  /** The hex numeric character reference, e.g. `&#xC1;`. */
  htmlNumberHex: string;
  /** The named character reference, e.g. `&Aacute;`. Always present for all 2,125 entries. */
  htmlName: string;
  /** The Unicode character name, e.g. `LATIN CAPITAL LETTER A WITH ACUTE`. */
  description: string;
}

/** The shape of the `html_entities.json` data file. */
export interface EntityData {
  metadata: {
    /** A human-readable note describing the data source and field conventions. */
    note: string;
    /** The total number of entities in the file. */
    count: number;
    /** The ordered list of field names present on each entity object. */
    fields: string[];
  };
  entities: Entity[];
}
