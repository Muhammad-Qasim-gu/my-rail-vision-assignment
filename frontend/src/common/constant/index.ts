export const homeText = {
  availableSeats: " Available Trains",
  loading: "Loading trains...",
  error: "Error:",
  trainNumber: " Train Number:",
  viewDetail: " View Details",
  trainDataApi: "http://localhost:8082/api/trains",
  
};

export const aboutUsText = {
  aboutUs: "About Us",
  welcome:
    "Welcome to the future of rail travel. We're passionate about providing safe, fast, and reliable train services to our customers.",
  ourMission: "Our Mission",
  ourMissionDetail:
    "Our mission is to revolutionize the railway system by offering convenient, environmentally friendly, and cost-effective travel solutions. We aim to provide an exceptional travel experience for all passengers, whether you're traveling for business or leisure.",
  ourHistory: "Our History",
  ourHistoryDetails:
    " With decades of experience in the railway industry, our company has been at the forefront of modernizing rail travel. From our humble beginnings to the large-scale network we operate today, we have always focused on providing the best service to our customers.",
  ourTeam: "Our Team",
  ourTeamDetails:
    "Our team consists of highly trained and dedicated professionals who work tirelessly to ensure that every journey is smooth and safe. From the engineers who maintain our trains to the customer service agents who assist passengers, we are committed to excellence in every aspect of our business.",
  goToBack: "Back to Home",
  homeLink: "/home",
};

export const trainDetailsText = {
  failedError: "Failed to fetch train data.",
  setError: "Error fetching train details.",
  loading: "Loading...",
  detailNotFound: "Train details not found.",
  details: "Details",
  trainNumber: "Train Number:",
  departureTime: "Departure Time:",
  arrivalTime: "Arrival Time:",
  trainName: "Train Name:",
  ticketPrice: "Ticket Price:",
  totalSeats: "Total Seats:",
  remainginSeats: "Remaining Seats:",
  purchaseTicket: " Purchase Ticket",
  backToHome: " Back to Home",
  purchaseTicketLink: "/purchaseTicket/",
};

export const purchaseTicketText = {
  noTrainFound: "Train Data NOt Found",
  ticketDataApi: "http://localhost:8082/api/tickets",
  failedToSave: "Failed to save ticket to database",
  successfullyPurchase: "Ticket purchased successfully!",
  purchaseTicket: "Purchase Ticket for Train",
  trainNumber: "Train Number:",
  trainName: "Train Name:",
  ticketPrice: "Ticket Price:",
  totalSeats: "Total Seats:",
  remainingSeats: "Remaining Seats:",
  passengerName: " Passenger Name",
  contactNumber: "Contact Number",
  numberOfTickets: " Number of Tickets",
  totalCost: "Total Cost:",
  confirmPurchase: "Confirm Purchase",
};

export const ticketListText = {
  // ticketListLinik: `http://localhost:8082/api/tickets/${userId}`,
  failedToLoad: "Failed to load tickets. Please try again later.",
  setError: "An error occurred while fetching tickets.",
  failedDelete: "Failed to delete ticket. Please try again later.",
  loading: "Loading tickets...",
  noTicketSold: "No tickets sold yet.",
  trainNUmber: "Train Number,",
  trainName: "Train Name",
  passengerName: "Passenger Name",
  contactNumber: "Contact Number",
  ticketCount: "Ticket Count",
  totalCost: "Total Cost",
  date: "Date",
  actions: "Actions",
};

export const headerText = {
  logo: "CHENNAI EXPRESS",
  homeLink: "/home",
  aboutLink: "/aboutUs",
  ticketListLink: "/TicketList",
  home: "Home",
  aboutUs: " About Us",
  ticketList: " Ticketing List",
  logOut: "Logout",
  loginLink: "/login",
};

export const loginText = {
  loginApi: "http://localhost:8082/auth/login",
  loginSuccess: "Login successful!",
  toasterError: "Failed to login. Please check your credentials.",
  errorDuringLogin: "Error during login:",
  email: "Email",
  password: "Password",
  doYouHaveAccount: "  Don't have an account?",
  signUpLink: "/signup",
  signUp: "   Sign up",
  invalidEmailForkik: "Invalid email format",
  emailRequired: "Email is required",
  passwordLength: "Password must be at least 6 characters",
  passwordRequired: "Password is required",
};

export const signUpText = {
  signUpLink: "http://localhost:8082/auth/signup",
  httpError: "HTTP error! status:",
  toasterSuccess: "Account created successfully! Redirecting to login...",
  toasterError: "Error creating account. Please try again.",
  loginLink: "/login",
  userName: "Username",
  email: "Email",
  password: "Password",
  alreadyAccount: " Already have an account?",
  loginHere: "Log in here",
  loginLInk: "/login",
  userNameLength: "Username must be at least 3 characters",
  userNAmeMax: "Username must be 15 characters or less",
  userNAmeRequires: "Username is required",
  invalidEmailFormat: "Invalid email format",
  emailRequired: "Email is required",
  passwordMustBe: "Password must be at least 6 characters",
  passwordRequired: "Password is required",
};
