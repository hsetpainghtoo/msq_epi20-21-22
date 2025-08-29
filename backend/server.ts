import express,{Request, Response} from "express";
import cors from "cors"
import fs from "fs"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const PORT = 8000;
const app = express();

app.use(express.json());
app.use(cors());



//Load user data from user.json file (create the file if it doesn't exist)
let users: {email:string; password:string}[] = [];
try{
    const userData = fs.readFileSync("./backend/data/users.json", "utf-8")
    users = JSON.parse(userData);
}catch(e){
    users = [];
}

interface Menu {
  name: string,
  price: number
}

let menus: Menu[] = [];

app.post("/register", (req: Request, res: Response) => {
  // please downgrade the @types/express package to fix "No overload matches this call. The last overload gave the following error". you can do so by doing "npm i -D @types/express@4"

  const { email, password } = req.body;
  console.log(req)
  //validation
  if (!email || !password) {
    return res.status(400).json({ error: "Email and Password are required" });
  }

  //hash the password using bcryptjs
  const salt = bcrypt.genSaltSync(10); //Number များလေ၊ Security မြင့်လေ၊ စက်ပိုလေးလေ
  const hash = bcrypt.hashSync(password, salt);

  const newUser = { email , password: hash };
  console.log(newUser)
  users.push(newUser);

  // Save the updated user to user.json
  fs.writeFileSync("./backend/data/users.json", JSON.stringify(users, null, 2)); //users နေရာမှာထည့်ချင်တဲ့ Data, ဘယ်လို Type မျိုး Replace လုပ်ချင်လဲ လုပ်လို့ရ, JSON type ပြောင်းထားတာကို ဖတ်လို့လွယ်အောင် Space ခြားပေးတာ (Epi 13 => 1:16:30)

  res.status(201).json({ message: "User Registered Successfully" });
});

app.post("/login", (req: Request, res: Response) => {
  const { email, password } = req.body;

  //validation
  if (!email || !password) {
    return res.status(400).json({ error: "Email and Password are required" });
  }

  const user = users.find((user) => user.email === email);

  if (!user) {
    return res.status(401).json({ error: "User Not Found" });
  }

  const passwordMatch = bcrypt.compareSync(password, user.password);

  if (!passwordMatch) {
    return res.status(401).json({ error: "Invalid Credentials" });
  }

  //   return res.status(200).send("Login Successfully!");

  //Create and send a JWT token upon successful authentication
  const accessToken = jwt.sign({ email }, "EW98adsoiew98Sasdt", { expiresIn: "1h" });
  // console.log(accessToken);
  return res.status(200).send({accessToken});
  // res.cookie("token", token); //server ကိုထိုးလိုက်တဲ့ request တိုင်းကို cookie မှာ key အနေနဲ့ထည့်သွားပေးတယ်
  // res.redirect("/");
});

app.post("/menu", (req: Request, res: Response)=>{
  const {name, price} = req.body;

  if(!name || price === undefined){
    return res.status(400).json({ error: "Name and Price are required!" });
  }

  menus.push({name, price});
  return res.status(200).send({menus})
})

app.listen(PORT, ()=>console.log(`Server has started listening on ${PORT}`))

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason);
});