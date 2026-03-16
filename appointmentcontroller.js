exports.createAppointment = (req, res) => {

const { fullname, email, phone, service, date, time } = req.body;

if(!fullname || !email || !phone || !service || !date || !time){
return res.status(400).json({ message: "Please fill all fields" });
}

console.log("New Appointment:", req.body);

res.json({
message: "Appointment booked successfully"
});

};
