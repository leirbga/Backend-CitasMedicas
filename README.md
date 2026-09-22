# API de reserva de citas médicas y pagos

Backend desarrollado con NestJS, TypeScript y MongoDB para la prueba técnica.

## Requisitos

- Node.js 20+
- MongoDB local o MongoDB Atlas

Configura `MONGO_URI` en `.env` (por ejemplo, `mongodb://127.0.0.1:27017/citas-medicas`).

```bash
npm install
npm run start:dev
```

Al iniciar, la aplicación carga automáticamente [`seed/seed-data.json`](./seed/seed-data.json) si las colecciones de médicos y pacientes están vacías. También puede ejecutarse `npm run seed`.

## Módulos

- `DoctoresModule`: médicos y especialidades.
- `PacientesModule`: pacientes con DNI único.
- `CitasModule`: disponibilidad, solapamiento y estados de citas.
- `PagosModule`: pagos agrupados y aprobación/rechazo administrativo.
- `RegistrosMedicosModule`: fichas médicas únicamente para citas pagadas.

## Endpoints

Todos los endpoints reciben y devuelven JSON. La aplicación usa `ValidationPipe` global con `whitelist`, `forbidNonWhitelisted` y validadores de `class-validator`.

### Médicos y pacientes

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/doctores` | Lista los médicos seed |
| POST | `/doctores` | Crea un médico: `{ "name": "Dr. López", "specialty": "Neurología", "consultationDurationMinutes": 30 }` |
| GET | `/pacientes` | Lista los pacientes seed |
| POST | `/pacientes` | Crea un paciente: `{ "name": "Paciente C", "dni": "V-33333333", "phone": "0412-0000000" }` |

### Citas

`POST /citas`

```json
{
  "patientId": "ID_MONGO_DEL_PACIENTE",
  "doctorId": "ID_MONGO_DEL_MEDICO",
  "startAt": "2026-09-23T10:00:00.000Z",
  "amount": 40
}
```

Una cita nueva queda en `RESERVADA`. Se devuelve `409 Conflict` si el médico tiene otra cita activa (`RESERVADA`, `PENDIENTE_PAGO` o `PAGADA`) cuyo intervalo se solapa. La duración se toma de `consultationDurationMinutes`.

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/citas` | Lista citas |
| GET | `/citas/:id` | Consulta una cita |
| POST | `/citas` | Agenda una cita |

### Pagos

`POST /pagos`

```json
{
  "appointmentIds": ["CITA_A", "CITA_B"],
  "paymentMethod": "TRANSFERENCIA",
  "bankReference": "REF-MED-2026",
  "amount": 90
}
```

El monto debe ser la suma exacta de las citas y todas deben estar `RESERVADA`. El pago queda `PENDIENTE` y las citas pasan a `PENDIENTE_PAGO`. La referencia no puede repetirse mientras el pago esté `PENDIENTE` o `APROBADO`.

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/pagos` | Lista pagos |
| POST | `/pagos` | Registra pago consolidado |
| PATCH | `/pagos/:id/reject` | Rechaza con `{ "reason": "Monto incompleto" }`; citas vuelven a `RESERVADA` |
| PATCH | `/pagos/:id/approve` | Aprueba; citas pasan a `PAGADA` |

Las transiciones de pago y citas se ejecutan dentro de una transacción MongoDB.

### Ficha médica

`POST /registros-medicos`

```json
{
  "appointmentId": "CITA_PAGADA",
  "reason": "Dolor torácico",
  "diagnosis": "Evaluación cardiológica normal",
  "treatment": "Control en 30 días",
  "attendedAt": "2026-09-23T11:30:00.000Z"
}
```

Devuelve `400 Bad Request` si la cita no está `PAGADA`. En caso exitoso crea la ficha y cambia la cita a `COMPLETADA`.

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/registros-medicos` | Lista fichas |
| POST | `/registros-medicos` | Registra diagnóstico y tratamiento |

## Demostración en Postman

Importa [`postman/citas-medicas.postman_collection.json`](./postman/citas-medicas.postman_collection.json). Copia los IDs obtenidos de `GET /doctores` y `GET /pacientes` en las variables `doctorPerezId`, `doctorGomezId`, `patientAId` y `patientBId`. Después de cada creación, guarda los IDs de las citas y del pago en las variables indicadas. Ejecuta las carpetas en orden para reproducir los tres escenarios solicitados.

## Validación

```bash
npm run build
npm run lint
npm test
```
