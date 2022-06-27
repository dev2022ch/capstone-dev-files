export  const OneRndOptions = {
    ONE_WAY: 1,
    ROUND_TRIP: 2,
    txtONE_WAY: "One Way",
    txtROUND_TRIP: "Round Trip"
}

export  const TransModeOptions = {
    AIR: 1,
    TRAIN: 2,
    MOTOR_VEHECLE: 3,
    SHIP: 4,
    OTHER: 0,
    txtAIR: "Air",
    txtTRAIN: "Train",
    txtMOTOR_VEHECLE: "Motor Vehicle",
    txtSHIP: "Ship",
    txtOTHER: "Other"
}

export  const AccomTypes = {
    HOTEL: 1,
    BandB: 2,
    HOSTEL: 3,
    HOMESTAY: 4,
    OTHER: 0,
    txtHOTEL: "Hotel",
    txtBandB: "B and B",
    txtHOSTEL: "Hostel",
    txtHOMESTAY: "Home Stay",
    txtOTHER: "Other"
}

export  const UserTypes = {
    VISITOR: 0,
    ORGANIZER: 1,
    GOER: 2
}

export const RegStatus = {
    N_A: 0,
    INVITED: 1,
    UNINVITED: 2,
    REGISTERED: 3,
    REG_PENDING_CONF: 4,
    REG_CXLD: 5
  }

export  const ActionsByOrg = {
    VIEW_DETAILS: 1,
    UN_INVITE: 2,
    CONFM_REGIST: 3,
    CANCEL_REGIST: 4,
    EDIT_NOTE: 5
}

export  const ActionSelOptionsForOrg = [
    {value: ActionsByOrg.VIEW_DETAILS,
        text: "View Details"
    },
    {value: ActionsByOrg.UN_INVITE,
        text: "Uninvite"
    },
    {value: ActionsByOrg.CONFM_REGIST,
        text: "Confirm Registration"
    },
     {value: ActionsByOrg.CANCEL_REGIST,
        text: "Cancel Registration"
    },
    {value: ActionsByOrg.EDIT_NOTE,
        text: "Edit Note"
    }
]

export  const RequestDirection = {
    TO_CONTACT: 1,
    FROM_CONTACT: 2
}

export  const ContactStatus = {
    PENDING: 1,
    CONFIRMED: 2,
    DECLINED: 3
}

export  const ActionOnContact = {
    CONFIRM: 1,
    DECLINE: 2,
    DELETE: 3
}


export  const VisitorUserData = {
    userID: 0,
    userName: 'Visitor',
    passWord: '',
    email: '',
    phone: ''
}
