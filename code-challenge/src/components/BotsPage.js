import React, { useState, useEffect } from "react";
import YourBotArmy from "./YourBotArmy";
import BotCollection from "./BotCollection";

function BotsPage() {
  //start here with your code for step one
  const [bots, setBots] = useState([]);

  //Fetch bots from server
  useEffect(() => {
    const fetchData = () => {
      return fetch(`http://localhost:8002/bots`)
        .then((resp) => resp.json())
        .then((data) => {
          setBots(data);
        });
    };
  
    fetchData();
  }, []);

  // Add bot to army when clicked
  function enlistBot(bot) {
    setBots(bots.map((b) => {
      if (b.id === bot.id) {
        return { ...b, army: true };
      }
      return b;
    }));
  }

  // Remove bot from army when clicked
  function removeBot(bot) {
    setBots(bots.map((b) => {
      if (b.id === bot.id) {
        return { ...b, army: false };
      }
      return b;
    }));
  }

  // Delete bot from service forever  
  async function deleteBot(bot) {
    await fetch(`http://localhost:8002/bots/${bot.id}`, {
      method: 'DELETE'
    });
    setBots(prevBots => {
      return prevBots.filter((b) => {
        return b.id !== bot.id;
      });
    });
  }

  return (
    <div>
      <YourBotArmy
        bots={bots.filter((b) => b.army)}
        removeBot={removeBot}
        deleteBot={deleteBot}
      />
      <BotCollection bots={bots} enlistBot={enlistBot} deleteBot={deleteBot} />
    </div>
  );
}

export default BotsPage;
