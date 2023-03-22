const {PrismaClient} = require("@prisma/client")

const prisma = new PrismaClient();

const userData = [
    {
        id : "fdjskfldjskflsd",
        fname : "gholi",
        lname : "zahedi",
        avatar_url : "fdjskfldjskflsd",
        registration_date : new Date(),
        phone : "1234835",
        birthday : new Date(),
        password : "sjdfkslfjdk",
        wallet : 5000
    },
    {
        id : "sdfdjskfjdsk",
        fname : "asghar",
        lname : "kamali",
        avatar_url : "rewfewwj",
        registration_date : new Date(),
        phone : "813248",
        birthday : new Date(),
        password : "ewfeslk",
        wallet : 6010
    }   
]

const ticketData = [
    {
        id : "342432",
        from_location : "tehran",
        to_location: "zanjan",
        arrival_date: new Date(),
        departure_date: new Date(),
        unit_price: 10.4,
        count: 4
        
    },
    {
        id : "23425",
        from_location : "esfahan",
        to_location: "khuzestan",
        arrival_date: new Date(),
        departure_date: new Date(),
        unit_price: 12.9,
        count: 3
        
    }
]

async function main(){
    console.log("Start seeding");
    for (const u of userData){
        const user = await prisma.user.create({
            data : u
        })
        console.log(`Created user with id: ${user.id}`);
    }
    for (const t of ticketData){
        const ticket = await prisma.ticket.create({
            data : t
        })
        console.log(`Created ticket with id ${ticket.id}`);
    }
    console.log("Seeding finished");
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    })