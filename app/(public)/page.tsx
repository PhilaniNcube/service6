
import { Hero } from './_components/hero'
import { Services } from './_components/services'
import { TouristTravel } from './_components/tourist-travel'
import { HowItWorks } from './_components/how-it-works'
import { WhyChooseUs } from './_components/why-choose-us'

const page = () => {
  return (
    <div>
        <Hero />
        <Services />
        <TouristTravel />
        <HowItWorks />
        <WhyChooseUs />
    </div>
  )
}

export default page