import { useEffect, useState } from "react";
import api from "../services/api";
import EmptyState from "../components/EmptyState";
import StatusBadge from "../components/StatusBadge";

function Offers() {
  const [offers, setOffers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await api.get("/students/offers");
        setOffers(response.data.offers);
      } catch (error) {
        console.error("Failed to fetch offers:", error);
        setError("Unable to load offers.");
      }
    };

    fetchOffers();
  }, []);

  if (error) {
    return <p className="alert error" role="alert">{error}</p>;
  }

  return (
    <div><div className="page-header"><div><h1>My offers</h1><p>Review offers made to you.</p></div></div>

      {offers.length === 0 ? (
        <EmptyState title="No offers yet" description="Any offer you receive will appear here." />
      ) : (
        <div className="table-wrap"><table><thead><tr><th>Offer date</th><th>Salary</th><th>Status</th></tr></thead><tbody>{offers.map((offer) => <tr key={offer.offer_id}><td>{offer.offer_date ? new Date(offer.offer_date).toLocaleDateString() : "—"}</td><td>{offer.salary}</td><td><StatusBadge status={offer.status} /></td></tr>)}</tbody></table></div>
      )}
    </div>
  );
}

export default Offers;
