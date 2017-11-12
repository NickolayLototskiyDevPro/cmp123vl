const ProjectModule = (function(){
	 
    const project = {
		participants: [],
		pricing: {},
		isBusy: false,

	   
		init(participants, pricing) {
			if (Array.isArray(participants) && typeof pricing == 'object' && !Array.isArray(pricing) && pricing !== null) {
			
				let isPricingValid = true;
				for(key in pricing) {
					if(typeof key != 'string' || typeof pricing[key] != 'number' || pricing[key] === NaN || !isFinite(pricing[key])) {
						isPricingValid = false;
					}
				}
			
				if (participants.every(conditionForParticipants) && isPricingValid) {
					this.participants = participants;
					this.pricing = pricing;
				};
			}
		},
				
		
		findParticipant(functor, callbackFunction) {
			if(this.isBusy === true) {
				return false;
			}
			this.isBusy = true;
						
			setTimeout(() => {
				let participant = this.participants.find(functor);
				
				if(participant === undefined) {
					participant = null;
				}
				this.isBusy = false;
				callbackFunction(participant);				
			});
			
			
		},
		
		 
		findParticipants(functor, callbackFunction) {
			if(this.isBusy === true) {
				return false;
			}
			this.isBusy = true;
												
			setTimeout(() => {
				
				let participantsArray = this.participants.filter(functor);
				this.isBusy = false;
				callbackFunction(participantsArray);				
			});					
		},

		
		addParticipant(participantObject, callbackFunction) {
			if(this.isBusy === true) {
				return false;
			}
			this.isBusy = true;
									
			setTimeout(() => {
				if(conditionForParticipants(participantObject)) {
					this.participants.push(participantObject);
					this.isBusy = false;
					callbackFunction();					
				} else {
					let err = new TypeError;					
					this.isBusy = false;
					callbackFunction(err);
				}				
			});			
		},
	
		
		removeParticipant(participantObject, callbackFunction) {
			if(this.isBusy === true) {
				return false;
			}
			this.isBusy = true;
									
			setTimeout(() => {
				let indexOfparticipantToRemove = this.participants.indexOf(participantObject);
				let participantToRemove;
				if (indexOfparticipantToRemove !== -1) {
					participantToRemove = this.participants.splice(indexOfparticipantToRemove, 1)[0];					
				} else {
					participantToRemove = null;
				}
				this.isBusy = false;
				callbackFunction(participantToRemove);				
			});				
		},
		
				   
		setPricing(participantPriceObject, callbackFunction) {
			if(this.isBusy === true) {
				return false;
			}										
			this.isBusy = true;									
			
			setTimeout(() => {
				let newLevel = Object.keys(participantPriceObject)[0];
				this.pricing[newLevel] = participantPriceObject[newLevel];								
				this.isBusy = false;
				callbackFunction();				
			});			
		},
		   
		calculateSalary(periodInDays) {			
			let reducer = (accum, item)=> {				
				if (this.pricing.hasOwnProperty(item[key])) {
					return accum + periodInDays*8*this.pricing[item[key]];
				} else {
					throw new Error(`There is no salary for coder with ${item[key]} level`);
				}				
			};
			return(this.participants.reduce( reducer, 0 ));			
		}		
	}
		
	function conditionForParticipants(item) {
		let isParticipantsItemValid = true;
		if (typeof item == 'object' && !Array.isArray(item) && item !== null) {
			for(key in item) {
				if(typeof key != 'string' || typeof item[key] != 'string') {
					isParticipantsItemValid = false;
				}
			}		
		}
		return (item.hasOwnProperty('seniorityLevel') && isParticipantsItemValid);	
	}
	
	let instance;
	function createInstance() {
        instance = project;
		return instance;
    }
		
	return {
        getInstance() {
            if (!instance) {
                instance = createInstance();
            }            
			return instance;
        }
    }    
	
})();





module.exports = {
    firstName: 'Olena',
    secondName: 'Chupryna',
    task: ProjectModule.getInstance()
}


