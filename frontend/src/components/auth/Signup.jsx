import React, { useState } from "react"
import SignupFormDemo from "./Form1"
import ProfileForm from "./Form2"

export default function Signup() {
    const [step, setStep] = useState(1)
    // Store Form 1 data so Form 2 can merge and submit everything together
    const [form1Data, setForm1Data] = useState({})

    const handleForm1Next = (data) => {
        setForm1Data(data)
        setStep(2)
    }

    return (
        <div className="min-h-screen w-full bg-black">
            {step === 1 && (
                <SignupFormDemo onNext={handleForm1Next} />
            )}
            {step === 2 && (
                <ProfileForm
                    form1Data={form1Data}
                    onBack={() => setStep(1)}
                />
            )}
        </div>
    )
}
