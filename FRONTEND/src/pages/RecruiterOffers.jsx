import { useState } from "react";
import api from "../services/api";
const offerStatuses = ["Offered", "Accepted", "Rejected"];

function RecruiterOffers() {
  const [form, setForm] = useState({ application_id: "", offer_date: "", salary: "" });
  const [offerId, setOfferId] = useState(""); const [status, setStatus] = useState("Offered"); const [message, setMessage] = useState(""); const [error, setError] = useState(""); const [loading, setLoading] = useState(false);
  const change = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  const create = async (event) => { event.preventDefault(); setError(""); setMessage(""); setLoading(true); try { const response = await api.post("/recruiter/offers", { ...form, application_id: Number(form.application_id), salary: Number(form.salary) }); setMessage(response.data.message || "Offer created successfully."); setForm({ application_id: "", offer_date: "", salary: "" }); } catch (e) { setError(e.response?.data?.message || "Unable to create offer."); } finally { setLoading(false); } };
  const update = async (event) => { event.preventDefault(); setError(""); setMessage(""); try { const response = await api.put(`/recruiter/offers/${offerId}`, { status }); setMessage(response.data.message || "Offer updated successfully."); setOfferId(""); } catch (e) { setError(e.response?.data?.message || "Unable to update offer."); } };
  return <div><h1>Offers</h1><p>The backend does not provide a recruiter offer-list endpoint. Create offers here or update one using its ID.</p>{message && <p>{message}</p>}{error && <p role="alert">{error}</p>}<h2>Create Offer</h2><form onSubmit={create}><input name="application_id" type="number" min="1" placeholder="Application ID" value={form.application_id} onChange={change} required /><br /><label>Offer date <input name="offer_date" type="date" value={form.offer_date} onChange={change} required /></label><br /><input name="salary" type="number" min="0" placeholder="Salary" value={form.salary} onChange={change} required /><br /><button disabled={loading}>{loading ? "Creating..." : "Create Offer"}</button></form><h2>Update Offer Status</h2><form onSubmit={update}><input type="number" min="1" placeholder="Offer ID" value={offerId} onChange={(e) => setOfferId(e.target.value)} required /><br /><select value={status} onChange={(e) => setStatus(e.target.value)}>{offerStatuses.map((item) => <option key={item}>{item}</option>)}</select><br /><button>Update Status</button></form></div>;
}
export default RecruiterOffers;
