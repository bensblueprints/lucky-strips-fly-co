import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="container-custom px-4 max-w-3xl">
        <h1 className="heading-1 text-gray-900 mb-8">Terms of Service</h1>

        <div className="prose prose-gray max-w-none">
          <p className="text-gray-600 mb-8">
            Last updated: {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
          </p>

          <h2 className="heading-3 text-gray-900 mt-8 mb-4">Booking & Payment</h2>
          <p className="text-gray-600 mb-4">
            By booking a guided trip with Lucky Strips Fly Co., you agree to the following terms:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>A deposit may be required to secure your booking</li>
            <li>Full payment is due before or on the day of your trip</li>
            <li>Prices are subject to change; however, confirmed bookings will honor the quoted price</li>
          </ul>

          <h2 className="heading-3 text-gray-900 mt-8 mb-4">Cancellation Policy</h2>
          <p className="text-gray-600 mb-4">
            We understand plans can change. Our cancellation policy is as follows:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Cancellations made 7+ days before the trip: Full refund</li>
            <li>Cancellations made 3-6 days before the trip: 50% refund</li>
            <li>Cancellations made less than 3 days before the trip: No refund</li>
            <li>Weather-related cancellations by Lucky Strips Fly Co.: Full refund or reschedule</li>
          </ul>

          <h2 className="heading-3 text-gray-900 mt-8 mb-4">Liability & Safety</h2>
          <p className="text-gray-600 mb-6">
            Fly fishing and outdoor activities involve inherent risks. By participating in a guided trip, you acknowledge these risks and agree that Lucky Strips Fly Co. is not liable for any injuries, damages, or losses that may occur during your trip. Participants are expected to follow all safety instructions provided by the guide.
          </p>

          <h2 className="heading-3 text-gray-900 mt-8 mb-4">Fishing License</h2>
          <p className="text-gray-600 mb-6">
            Guests are required to have a valid Virginia fishing license with a trout stamp. It is the guest&apos;s responsibility to obtain the appropriate license before the trip. Licenses can be purchased online at the Virginia Department of Wildlife Resources website.
          </p>

          <h2 className="heading-3 text-gray-900 mt-8 mb-4">Equipment</h2>
          <p className="text-gray-600 mb-6">
            All fly fishing equipment is provided by Lucky Strips Fly Co. Guests are welcome to bring their own equipment if preferred. Any damage to provided equipment beyond normal wear and tear may be subject to replacement costs.
          </p>

          <h2 className="heading-3 text-gray-900 mt-8 mb-4">Conservation</h2>
          <p className="text-gray-600 mb-6">
            We practice catch and release to protect the wild trout population of the Smith River. Guests are expected to follow proper catch and release techniques as instructed by the guide.
          </p>

          <h2 className="heading-3 text-gray-900 mt-8 mb-4">Contact Us</h2>
          <p className="text-gray-600 mb-4">
            Questions about these terms? Contact us:
          </p>
          <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
            <li>Email: luckystripsflyco@gmail.com</li>
            <li>Phone: (276) 732-0517</li>
          </ul>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link href="/" className="text-primary-600 hover:text-primary-700 font-medium">
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
