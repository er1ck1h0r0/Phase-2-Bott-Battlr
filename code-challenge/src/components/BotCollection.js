import React from "react";
import BotCard from "./BotCard";

function BotCollection({ bots,enlistBot,deleteBot}) {
  // Your code here
  const botItems = bots.map((bot) => {
    return (
      <BotCard
        key={bot.id}
        bot={bot}
        clickEvent={enlistBot}
        deleteBot={deleteBot}
        
      />
    );
  });
  return (
    <div className="ui four column grid">
      <div className="row">
        {/*...and here..*/}
        {botItems}
      </div>
    </div>
  );
}

export default BotCollection;