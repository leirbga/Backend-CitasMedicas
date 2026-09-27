# API de reserva de citas médicas y pagos

Backend desarrollado con NestJS, TypeScript y MongoDB para la prueba técnica.

## Requisitos

- Node.js 20+
- MongoDB local o MongoDB Atlas

Configura `MONGO_URI` en `.env` (por ejemplo, `mongodb://127.0.0.1:27017/appointments-medicas`).

```bash
npm install
npm run start:dev
```

Al iniciar, la aplicación carga automáticamente [`seed/seed-data.json`](./seed/seed-data.json) si las colecciones de médicos y pacientes están vacías. También puede ejecutarse `npm run seed`.

## Módulos

- `DoctorsModule`: médicos y especialidades.
- `PatientsModule`: pacientes con DNI único.
- `AppointmentsModule`: disponibilidad, solapamiento y estados de citas.
- `PaymentsModule`: pagos agrupados y aprobación/rechazo administrativo.
- `MedicalRecordsModule`: fichas médicas únicamente para citas pagadas.

## Endpoints

Todos los endpoints reciben y devuelven JSON. La aplicación usa `ValidationPipe` global con `whitelist`, `forbidNonWhitelisted` y validadores de `class-validator`.

### Médicos y pacientes

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/doctors` | Lista los médicos seed |
| POST | `/doctors` | Crea un médico: `{ "name": "Dr. López", "specialty": "Neurología", "consultationDurationMinutes": 30 }` |
| GET | `/patients` | Lista los pacientes seed |
| POST | `/patients` | Crea un paciente: `{ "name": "Paciente C", "dni": "V-33333333", "phone": "0412-0000000" }` |

### Citas

`POST /appointments`

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
| GET | `/appointments` | Lista citas |
| GET | `/appointments/:id` | Consulta una cita |
| POST | `/appointments` | Agenda una cita |

### Pagos

`POST /payments`

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
| GET | `/payments` | Lista pagos |
| POST | `/payments` | Registra pago consolidado |
| PATCH | `/payments/:id/reject` | Rechaza con `{ "reason": "Monto incompleto" }`; citas vuelven a `RESERVADA` |
| PATCH | `/payments/:id/approve` | Aprueba; citas pasan a `PAGADA` |

Las transiciones de pago y citas se ejecutan dentro de una transacción MongoDB.

### Ficha médica

`POST /medical-records`

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
| GET | `/medical-records` | Lista fichas |
| POST | `/medical-records` | Registra diagnóstico y tratamiento |

## Demostración en Postman

Importa [`postman/appointments-medicas.postman_collection.json`](./postman/appointments-medicas.postman_collection.json). Copia los IDs obtenidos de `GET /doctors` y `GET /patients` en las variables `doctorPerezId`, `doctorGomezId`, `patientAId` y `patientBId`. Después de cada creación, guarda los IDs de las citas y del pago en las variables indicadas. Ejecuta las carpetas en orden para reproducir los tres escenarios solicitados.

## Validación

```bash
npm run build
npm run lint
npm test
```
 