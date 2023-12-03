import React, { useContext, createContext } from "react";
import {
  useAddress,
  useContract,
  useMetamask,
  useContractWrite,
  useContractRead,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract(import.meta.env.VITE_CONTRACT);

  const { mutateAsync: addMedicine } = useContractWrite(
    contract,
    "addMedicine"
  );
  const { mutateAsync: updateMedicine } = useContractWrite(
    contract,
    "updateMedicine"
  );
  const { mutateAsync: updateManyMedicine } = useContractWrite(
    contract,
    "updateManyMedicine"
  );
  const { mutateAsync: addMultipleMedicines } = useContractWrite(
    contract,
    "addMultipleMedicines"
  );

  const address = useAddress();
  const connect = useMetamask();
  const publishMedicine = async (form) => {
    try {
      const data = await addMedicine({
        args: [
          form.MedicineName,
          form.StripID,
          [form.Conditions],
          address,
          form.Quantity,
          form.Status,
          [form.Ingredients],
          [form.SideEffects],
          form.ExpiryDate,
          form.ManufactureDate,
          form.BatchNumber,
          form.Price,
        ],
      });
      console.log("Contract call success");
    } catch (error) {
      console.log("Contract call failed", error);
    }
  };

  const getMedicine = async (NDC) => {
    try {
      // const data = await contract.getMedicine(NDC);
      const data = await contract.call("getMedicine", [NDC]);
      return data;
      console.log(data);
    } catch (error) {
      console.log("Contract call failed", error);
      return 0;
    }
  };

  const ModifyMedicine = async (form) => {
    try {
      const data = await updateMedicine({
        args: [form.StripID, form.status],
      });
      console.log("Update success");
    } catch (error) {
      console.log("Contract call failed", error);
    }
  };

  const ModifyManyMedicine = async (form) => {
    try {
      const data = await updateManyMedicine({
        args: [form.sids],
      });
      console.log("Update success");
    } catch (error) {
      console.log("Contract call failed", error);
    }
  };

  const publishMultipleMedicines = async (form) => {
    try {
      const StripIDs = [];
      const commaSeparatedParts = form.StripID.split(",");

      for (const part of commaSeparatedParts) {
        if (part.includes("-")) {
          const [start, end] = part.split("-").map(Number);
          for (let i = start; i <= end; i++) {
            StripIDs.push(i);
          }
        } else {
          StripIDs.push(Number(part));
        }
      }

      const data = await addMultipleMedicines({
        args: [
          form.MedicineName,
          StripIDs,
          [form.Conditions],
          address,
          form.Quantity,
          form.Status,
          [form.Ingredients],
          [form.SideEffects],
          form.ExpiryDate,
          form.ManufactureDate,
          form.BatchNumber,
          form.Price,
        ],
      });
      console.log("Contract call success");
    } catch (error) {
      console.log("Contract call failed", error);
    }
  };

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        addMultipleMedicines: publishMultipleMedicines,
        addMedicine: publishMedicine,
        getMedicine,
        updateMedicine: ModifyMedicine,
        updateManyMedicine: ModifyManyMedicine,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
