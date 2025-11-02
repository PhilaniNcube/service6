
import { Hero } from './_components/hero'
import { Services } from './_components/services'
import { HowItWorks } from './_components/how-it-works'
import { WhyChooseUs } from './_components/why-choose-us'

const page = () => {
  return (
    <div>
        <Hero />
        <Services />
        <HowItWorks />
        <WhyChooseUs />
    </div>
  )
}

export default page