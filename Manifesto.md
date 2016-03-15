# Manifesto

This document is intended to serve as a high level expression of the architectural perspective of this framework. The
principles expressed below will weigh heavily into architectural designs as the framework moves forward and continues
to evolve.

This idea is taken from [GangPlank](http://gangplankhq.com), because GangPlank is awesome and 
[their manifesto is awesome](http://gangplankhq.com/vision/manifesto/).

* **overridable conventions** over **configuration** <sup>1</sup>

* **native interfaces** over **abstractions** <sup>2</sup>

* **long-term scalability** over **short-term ease** <sup>3</sup>

* **real-time** over **not real-time** <sup>4</sup>

* **web** over **native mobile** <sup>5</sup>

<br/>

<font color='#777'>

1. Lore is an opinionated framework that strives to promote certain architectural patterns through its conventions. But
it's also respectful, and understands that you may have different opinions and have very good reasons for wanting to 
follow them. Therefore, Lore will always strive to express it's opinions as <em>conventions</em> only, and the 
architecture and documentation will continually strive to make it easier to override them should you want to.

<p/><p/>

2. Lore <em>is not</em> and <em>will not</em> attempt to hide the native implementations of the core libraries it's 
built from. Doing so would not only require us to take on the educational burden of each of those libraries, but we 
see no need to. React, Redux, and React Router are all beautiful. Their interfaces are beautiful. Their behavior is 
beautiful. To hide that beauty would be to rob you of it. And that would make us sad. Lore is not meant to replace 
them or abstract them; it is merely meant to help connect them and promote some opinions about best practices.

<p/><p/>

3. Otherwise known as "everything should be magical, but we want you to be able to slay dragons, not just jellies". 

<p/><p/>

4. Real-time! Eventually! As soon as reasonable. Because real-time is needed for good collaboration, and true greatness
is born from  collaboration. But in all seriousness (though we were serious about that too) the only apps that work 
well without real-time support are those that only allow for a single user. As soon as team support is added, and 
multiple people are interacting with data in the same account, real-time becomes a real benefit to the user 
experience, even if you don't think of your app as a "real-time app" (e.g. chat, gaming, collaboration, etc).

<p/><p/>

5. Native mobile experiences are typically the best mobile experiences, and <a href="https://facebook.github.io/react-native">react-native</a> 
is showing a lot of promise towards developing native experiences using the same tooling we use for the web. But 
that's still a new frontier, and we have no intention of taking Lore in that direction right now. Lore's primary focus 
is building a framework that minimizes the amount of time needed to build large browser based web applications, so that
developers can spend more time refining the user experience and not just "getting it to work". We might expand our focus
towards native mobile eventually, but it's not part of the currently foreseeable roadmap.

</font>
