
// define the environment variables for Typescript help at design time
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      BASE_URL: string;
      REPORTER_JSON: string;
      HEADLESS: 'headless' | false;
      VIEWPORT_WIDTH: number;
      VIEWPORT_HEIGHT: number;
      SECRET_MANAGER: 'Azure' | 'local';
      // ----------------------------
      // Add aditional values here such as:
      admin_username: string;
      admin_password: string;      
    }
  }
}


// list out all required env values for your customer's tests here. Capitalization matters.
const requiredValues = [  
  'BASE_URL',
  'REPORTER_JSON',
  'HEADLESS',
  'VIEWPORT_WIDTH',
  'VIEWPORT_HEIGHT',
  'SECRET_MANAGER',
  // ---------------------------
  // Add aditional validation here such as
  // 'admin_username',
  // 'admin_password',
  // 'dealer_username',
  // 'dealer_password',
]

export const envValidate = ()=>{
  requiredValues.map(value => {
    if(typeof process.env[value] === 'undefined'){
      console.log(`missing env value: ${value}`);
      throw new Error(`Missing env value: ${value}`);
    }
  })
}