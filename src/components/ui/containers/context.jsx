import { createContext } from 'react';
export const MultiStepFormContext = createContext(null);

// export const MultiStepFormProvider = ({ children }) => {
//   const [globalState, setGlobalState] = useState({ theme: 'light', user: 'Guest' });
//   console.log('props---->', props );

//   return (
//     <MultiStepFormContext.Provider value={{ props}}>
//       {children}
//     </MultiStepFormContext.Provider>
//   );
// }