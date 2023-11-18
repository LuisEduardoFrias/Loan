export default function useDateTime() {
  function datetime(): string {
    const date = new Date().toLocaleDateString("es-DO");
    const time = new Date().toLocaleTimeString("es-DO");
    return `${date} ${time}`;
  };

  function time(): string {
    const time = new Date().toLocaleTimeString("es-DO");
    return time;
  };

  function date(): string {
    const date = new Date().toLocaleDateString("es-DO");
    return date;
  };

  return [datetime, date, time];
}
