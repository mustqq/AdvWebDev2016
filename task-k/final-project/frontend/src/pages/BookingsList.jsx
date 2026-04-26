import React, { useEffect, useState } from 'react';

function BookingsList() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/bookings');
        const data = await res.json();
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <section className="py-5 container">
      <h2 className="fw-bolder mb-4">Tallennetut varaukset (Database Read)</h2>
      {loading ? (
        <p>Ladataan...</p>
      ) : (
        <div className="row">
          {bookings.map((b) => (
            <div className="col-md-6 col-lg-4 mb-4" key={b.id}>
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title">{b.name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{b.email}</h6>
                  <p className="card-text">
                    <strong>Päivämäärä:</strong> {new Date(b.booking_date).toLocaleDateString()}<br/>
                    {b.message && <span><strong>Viesti:</strong> {b.message}</span>}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default BookingsList;