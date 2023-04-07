
interface SeeData {
    entries:SeedEntry[]
}

interface SeedEntry {
    description: string;
    status: string;
    createdAt: number;
}


export const seedData:SeeData={
    entries:[
        {
        
            description:'Pendiente: kfokfokf oodmdfm didiodnd infinf1',
            status:'pending',
            createdAt: Date.now()
          },
          {
        
            description:'En-progreso: kfokfokf oodmdfm didiodnd ihhhhh2',
            status:'in-progress',
            createdAt: Date.now() - 1000000
          },
          {
        
            description:'Terminadas: kfokfokf oodmdfm didiodnd igggg3',
            status:'finished',
            createdAt: Date.now() - 100000
          }
    ]
}