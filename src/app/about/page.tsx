import { Button } from "@/components/ui/button";

export default function About() {
  return (
    <div className="container mx-auto px-6 py-12 space-y-12">
      {/* Header Section */}
      <section className="text-center space-y-6">
        <h1 className="text-4xl font-extrabold leading-tight">
          About <span className="text-primary">Us</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Welcome to our blog! We’re passionate about sharing knowledge,
          inspiring stories, and helpful tips on a variety of topics.
        </p>
      </section>

      {/* Our Mission Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
        <div>
          <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
          <p className="text-muted-foreground leading-relaxed">
            Our mission is to create a space where readers can learn, grow, and
            stay informed. We aim to cover topics that matter, spark curiosity,
            and inspire action. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae voluptas alias totam nobis minus facere magnam doloribus recusandae assumenda, commodi odio aliquam ullam quis amet beatae quisquam fuga perspiciatis veritatis.
          </p>
          <Button className="mt-4">
            Learn More
          </Button>
        </div>
        <div>
          <img
            src="/img/bg5.jpg"
            alt="Our Mission"
            className="rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* Team Section */}
      <section className="space-y-6 ">
        <h2 className="text-3xl font-semibold text-center">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              name: "Sarah Johnson",
              role: "Content Creator",
              img: "https://plus.unsplash.com/premium_photo-1689568126014-06fea9d5d341?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            },
            {
              name: "Michael Smith",
              role: "Editor",
              img: "https://plus.unsplash.com/premium_photo-1688572454849-4348982edf7d?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            },
            {
              name: "Emily Chen",
              role: "Designer",
              img: "https://plus.unsplash.com/premium_photo-1693000696650-e73643956033?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            },
            {
              name: "David Lee",
              role: "SEO Specialist",
              img: "https://plus.unsplash.com/premium_photo-1688350839154-1a131bccd78a?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            },
          ].map((member, index) => (
            <div key={index} className="text-center">
              <img
                src={member.img}
                alt={member.name}
                className="w-24 h-24 mx-auto rounded-full mb-4 object-cover"
              />
              <h3 className="text-xl font-medium">{member.name}</h3>
              <p className="text-muted-foreground text-sm">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="text-center space-y-6">
        <h2 className="text-3xl font-semibold">Join Our Journey</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Whether you’re here to learn, share, or explore, we’re thrilled to
          have you with us. Let’s make the world a better place, one article at
          a time. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non sequi quo illo quibusdam adipisci neque ratione qui ipsa corrupti iure.
        </p>
        <Button variant="default" size="lg">
          Contact Us
        </Button>
      </section>
    </div>
  );
}
