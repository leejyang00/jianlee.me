import Article from '@/components/Layout/Article'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
import ScrollToTop from '@/shared/ScrollToTop'
import { ASSETS } from '@/shared/Constants'
import Tag from '@/shared/Tag'
import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded'

export const Route = createFileRoute('/projects/pacemates')({
  component: ScrollToTop(RouteComponent),
})

function RouteComponent() {
  useEffect(() => {
    document.title = 'Pacemates Run Club | Jian'
  }, [])

  return (
    <div>
      <Article title="Pacemates Run Club" date="2023">
        <div className="text-sm text-justify">
          <div className="mb-8">
            <img
              src={`${ASSETS.IMAGES}/pacemates.jpg`}
              alt="Pacemates Run Club"
              className="rounded-lg h-[295px] w-full object-cover"
            />
          </div>
          From an ideation to reality. This was one of my favourite projects
          that I’ve done, so much so that it was out of my comfort zone.
          <div className="flex flex-col gap-2 ml-2 pt-4">
            <div className="flex flex-row items-center gap-1">
              <Tag tag="INSTAGRAM" />
              <a
                href="https://www.instagram.com/pacematesrunclub/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink hover:underline flex flex-row items-center gap-1"
              >
                @pacematesrunclub <LaunchRoundedIcon sx={{ fontSize: 16 }} />
              </a>
            </div>
            <div className="flex flex-row items-center gap-1">
              <Tag tag="Strava" />
              <a
                href="https://www.strava.com/clubs/1180710"
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink hover:underline flex flex-row items-center gap-1"
              >
                Pacemates Run Club <LaunchRoundedIcon sx={{ fontSize: 16 }} />
              </a>
            </div>
          </div>
          <br />
          <div className="font-bold text-lg mb-2">background:</div>
          <div className="indent-4">
            My journey began back in 2020 when Covid hit, couldn’t do much
            exercise with places restricted or high risk to exposure. My only
            available options was running. Plus, I was pretty active in Strava
            previously for my road cycling adventures, so what other ways to
            gamify it! Fast forward to 2023, when my good friend, Ethan,
            introduced me the ideation of running a marathon. 42.2 km.
          </div>
          <br />
          “You’re insane”, I told him.
          <br />
          “Where?” To which he replied, “Sydney…”
          <br />
          "So I’m gonna be running the longest distance I’ve had, plus in one of
          the prettiest city in the world?" If you know me well enough, I’m
          always up for a challenge. "COUNT ME IN!", I said.
          <br />
          <br />
          <div className="font-bold text-lg mb-2 uppercase">why</div>
          <div className="indent-4">
            Why a run club? Because I’ve been running alone and I want to build
            a community. You know that saying,{' '}
            <span className="font-bold italic">
              “If you wanna go fast, go alone. If you wanna go far, go
              TOGETHER.”
            </span>{' '}
            Plus, it’s hard these days finding the kind of people that fits into
            your social group. I wanted to meet new people in the community area
            that has similar interest. So instead of searching for them, I’ll
            bring them to me :)
          </div>
          <br />
          <div className="font-bold text-lg mb-2 uppercase">journey</div>
          <div className="indent-4">
            We started off in October 2023. It was fresh, we were excited,
            called in a few friends, plus friends of friends, to join us in our
            runs.
            <br />
            <br />
            <div className="indent-4">
              Questions: Whats the best time to run? What day should it be? How
              bout running it twice a week to cater to cater both students and
              working adults? What should be the right distance? What’s the
              route gonna be? What are the sequence of events that should be
              days before the run, on the run day, and after, to keep our member
              highly engaged to wanna come back?
            </div>
            <br />
            All these questions, I had to answer...
            <br />
            <br />
            so, every Tuesdays @ 7pm, Southbank Brisbane. 5km easy pace run.
            “easy”…
            <br />
            <br />
            <img
              src={`${ASSETS.IMAGES}/pacemates/last-dance.jpg`}
              alt="Pacemates Run Club"
              className="rounded-lg w-full object-cover mb-4"
            />
            <div className="indent-4">
              We started off from 3 to 5 runners per week, and once word got
              out, we were peaking around 15 runners in a week. I know, 172 IG
              followers, 3000+ views on reels, 30+ members in our Strava club, I
              thought we would have at least 20+ runners per week am I right?
              Unfortunately that reality didn’t came. But I’m always grateful
              for the ones that made time coming out on a weekday night running
              with a guy that’s chasing his dreams. I brought in a few friends
              to help out with the club.
            </div>
          </div>
          <br />
          <div className="indent-4">
            We have Instagram, WhatsApp group, Strava club to give updates, plus
            a website that never got used to it’s fullest potential. We had all
            the social reachability as much as we could, yet, the numbers
            weren’t peaking as much as we thought we could. And did you know
            we’ve got a merch? Pacemates Run Club merch. Shopify store, online
            purchase + delivery, our communities running all in our merch... [it
            was all a dream]
            <br />
            <br />
            What really happened was, a POC shirt, bought 6 of them from a local
            supplier. Dollars spent, $240. Dollars earned, $0. Profit -$240.
            Here’s one of my last marathon I did where i wore the merch.
          </div>
          <br />
          <div className="font-bold text-lg mb-2 uppercase">learnings</div>
          <div className="indent-4">
            The best thing about running your own club is meeting new people.
            Every week it was almost always a surprise to have new runners
            joining us, when I thought the worsts of having just me. I think
            finding the right people to run a club together is important too, to
            have the right goals and mindset, especially with similar interests.
            Throughout my journey, I wouldn’t have done it without my friends
            that have helped me along the way. Their guidance, support,
            commitment, and advice, truly shape the club as how it went.
            <br />
            <br />
            <div className="indent-4">
              Would I do this again? Propably not, just cuz my focus is
              elsewhere now. Do I regret running the club? Never. The numerous
              people I’ve met, learnings through the should do/not do, priceless
              in my eyes. Lessons learned only through doing.
            </div>
          </div>
          <br />
          <div id="closing" className="font-bold text-lg mb-2 uppercase">
            closing{' '}
            {/* <span className="opacity-0 group-hover:opacity-100 transition-opacity text-pink text-sm">
              #
            </span> */}
          </div>
          <div className="indent-4">
            Unfortunately it ended on July 2024, I was retiring the club as the
            people joining our weekly runs were stagnating, friends that helped
            me had other commitments, I was left mostly alone running the social
            media space. I’ve decided to close the club, and ended the journey.
          </div>
          <br />
          Nevertheless, this won’t be my last projects. See you in the next one
          😄 !
          <br />
          <br /> <span className="font-bold">* Thanks to:</span> Henry, Kinn,
          Steven, Sandeep, Dino, Eleesha, Edison and all my friends + strangers
          I’ve met and helped out. You know who you are 😉
        </div>
      </Article>
    </div>
  )
}
