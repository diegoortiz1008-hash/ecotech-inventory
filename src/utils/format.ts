/** Formatea kg de CO2 para mostrarlos en la UI. Función pura. */
export const formatCarbon = (kg: number | null): string =>
  kg === null ? 'Sin datos' : `${kg.toFixed(2)} kg CO2e`
