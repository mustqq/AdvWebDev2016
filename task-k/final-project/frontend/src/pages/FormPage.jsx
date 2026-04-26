import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const formSchema = z.object({
  name: z.string().min(2, { message: "Nimen on oltava vähintään 2 merkkiä pitkä." }),
  email: z.string().email({ message: "Virheellinen sähköpostiosoite." }),
  bookingDate: z.string().min(1, { message: "Päivämäärä on valittava." }),
  message: z.string().optional(),
});

function FormPage() {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      setResponse(result);
      reset();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-5">
      <div className="container px-5">
        <div className="bg-light rounded-4 py-5 px-4 px-md-5">
          <div className="text-center mb-5">
            <div className="feature bg-primary bg-gradient-primary-to-secondary text-white rounded-3 mb-3">
              <i className="bi bi-envelope"></i>
            </div>
            <h1 className="fw-bolder">Contact</h1>
            <p className="lead fw-normal text-muted mb-0">Test API connection</p>
          </div>

          <div className="row gx-5 justify-content-center">
            <div className="col-lg-8 col-xl-6">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-floating mb-3">
                  <input
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    id="name"
                    type="text"
                    {...register("name")}
                  />
                  <label htmlFor="name">Full Name</label>
                  {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                </div>

                <div className="form-floating mb-3">
                  <input
                    className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                    id="email"
                    type="email"
                    {...register("email")}
                  />
                  <label htmlFor="email">Email address</label>
                  {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                </div>

                <div className="form-floating mb-3">
                  <input
                    className={`form-control ${errors.bookingDate ? 'is-invalid' : ''}`}
                    id="bookingDate"
                    type="date"
                    {...register("bookingDate")}
                  />
                  <label htmlFor="bookingDate">Date</label>
                  {errors.bookingDate && <div className="invalid-feedback">{errors.bookingDate.message}</div>}
                </div>

                <div className="d-grid">
                  <button className="btn btn-primary btn-lg" type="submit" disabled={loading}>
                    {loading ? "Sending..." : "Submit"}
                  </button>
                </div>
              </form>

              {response && (
                <div className="mt-5">
                  <h4 className="fw-bolder text-success mb-3">Varaus tallennettu tietokantaan:</h4>
                  <div className="card shadow-sm border-0">
                    <div className="card-body bg-dark text-light rounded">
                      <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                        {JSON.stringify(response, null, 2)}
                      </pre>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FormPage;