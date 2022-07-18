<h1>Welcome to Arora in React Native</h1>
<div>
  <h1>Overview</h1>
  <p>
    Arora's conversion to react native allowed for the development of both android and iphone versions without the trouble of learning two different technologies. It allows for easy package integration as well as many other useful resources that react native provides. Here are some things you should know about the project:
  </p>
</div>
<div>
  <h1>Contents</h1>
  <blockquote>
    <h2><a href="#install-and-run">Install and run</a></h2>
    <h2><a href="#install-a-dependency">Install a dependency</a></h2>
    <h2><a href="#screens">Screens</a></h2>
    <h2><a href="#packages">Packages</a></h2>
  </blockquote>
</div>
<div id="#install-and-run">
  <h1>Install and Run</h1>
  <li>Clone the repository<br>
    <blockquote>git clone https://github.com/jacknormand/Arora-React.git</blockquote>
  </li>
  <li>Change into MobileGame directory<br>
    <blockquote>cd Arora-React/MobileGame</blockquote>
  </li>
  <li>Install the expo client using the package manager of your choice( I will use npm )<br>
   <blockquote>npm install -g expo-cli ( global installation is optional )</blockquote>
  </li>
  <li>Start up the Arora-Server<br>
    <blockquote>Instuctions Here: https://github.com/CANIS-NAU/ARORA-Server</blockquote>
  </li>
  <li>Run the app ( While in MobileGame directory )<br>
    <blockquote>npm start or expo start</blockquote>
  </li>
</div>
<div id="install-a-dependency">
  <h1>Installing Dependencies</h1>
  <p>React Native bundles them for you upon install!</p>
  <p>If you wish to install a new dependency just make sure you're in the MobileGame directory and run<br> 
    <blockquote>npm install {dependency}</blockquote> It will automatically add the new package to the package.json. From there just import the library where it's needed </p>
</div>
<div id="#screens">
  <h1>Screens Hierarchy</h1>
    <h2>Splash</h2>
    <blockquote>
      <h3>Routes: Login or Wellness</h3>
      <h3>Actions: Loads cache resources, determines autologin, and routes accordingly.</h3>
    </blockquote>
    <h2>Login</h2>
    <blockquote>
      <h3>Routes: Registration or Wellness</h3>
      <h3>Actions: Verify user entered login information and route or display invalid information Alert.</h3>
    </blockquote>
    <h2>Registration</h2>
      <blockquote>
        <h3>Routes: Login</h3>
        <h3>Actions: Allow user to create a new account, upon creation routes to login.</h3>
      </blockquote>
    <h2>Wellness</h2>
    <blockquote>
      <h3>Routes: Home</h3>
      <h3>Actions: Creates a form from user entered mood and stress values.</h3>
    </blockquote>
    <h2>Home</h2>
      <blockquote>
        <h3>Routes: Atrium, Learning Activities and Chat</h3>
        <h3>Actions: Act as a hub for user to see pollen count and all routing options</h3>
      </blockquote>
      <h2>Breathing Game</h2>
      <blockquote>
        <h3>Routes: Reward</h3>
        <h3>Actions: Allows user to play breathing game and upon completion, sends user to acquire reward.</h3>
      </blockquote>
      <h2>Chat</h2>
      <blockquote>
        <h3>Routes: Back To Home</h3>
        <h3>Actions: Chat for user to communicate mentor</h3>
      </blockquote>
      <h2>Walking</h2>
      <blockquote>
        <h3>Routes: Reward</h3>
        <h3>Actions: Plays audio while user takes a walk and listens, reward is available after set time.</h3>
      </blockquote>
      <h2>Atrium</h2>
      <blockquote>
        <h3>Routes: Back To Home</h3>
        <h3>Actions: Show users butterflies and displays information on press.</h3>
      </blockquote>
      <h2>Reward</h2>
      <blockquote>
        <h3>Routes: Home</h3>
        <h3>Actions: Displays animation and rewards user for activity completed and routes back home.</h3>
      </blockquote>
</div>

<div id="#packages">
  <h1>Important Libraries Used</h1>
  <li>AsyncStorage<br>
    <blockquote>
      Package: @react-native-async-storage/async-storage<br> Used to keep and use data app wide and allow for no internet connection features.<br>
      <a href="https://react-native-async-storage.github.io/async-storage/docs/usage">Documentation</a>
    </blockquote>
  </li>
  <li>Network Information<br>
    <blockquote>Package: @react-native-community/netinfo<br> Used to check active network status. Returns boolean values for that corresponding connection status ( true for connection and false for no connection ).<br>
    <a href="https://www.npmjs.com/package/@react-native-community/netinfo">Documentation</a>
   </blockquote>
  </li>
  <li>Navigation<br>
    <blockquote>Package: @react-navigation/native-stack<br> Used to navigate throughout the app screens. Stack based architecture allows for easy screen addition.<br>
    <a href="https://reactnavigation.org/docs/stack-navigator/">Documentation</a>
    </blockquote>
  </li>
  <li>JSON Animations<br>
    <blockquote>Package: lottie-react-native<br> Allows for very smooth and easy to use JSON animations.<br>
    <a href="https://github.com/lottie-react-native/lottie-react-native">Documentation</a>
    </blockquote>
  </li>
  <li>Chat<br>
    <blockquote>Package: react-native-gifted-chat<br> Provides a very nice UI for chats. Also includes a built in message state which is useful when getting an array of messages and displaying them.<br>
    <a href="https://github.com/FaridSafi/react-native-gifted-chat">Documentation</a>
    </blockquote>
  </li>
  <li>Cacheing Resources<br>
    <blockquote>Package: react-native-expo-cached-image<br> Provides resources for caching assets used in the app. Important when using a stack based navigation system ( Without caching assets, loading some assets upon navigation can be an issue ). Caching occurs during app loading on splash screen.<br>
    <a href="https://www.npmjs.com/package/react-native-expo-cached-image">Documentation</a>
    </blockquote>
  </li>
</div>
