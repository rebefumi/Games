#region Using Statements
using System;

using System.Collections.Generic;

using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework.Storage;
using Microsoft.Xna.Framework.Input;

#endregion

namespace Memory
{
	/// <summary>
	/// This is the main type for your game.
	/// </summary>
	public class Game1 : Game
	{
		GraphicsDeviceManager graphics;
		SpriteBatch spriteBatch;

		Board board;

		Button buttonExit;
		Button buttonGame;

		static GameState gameState = GameState.Menu;

		Texture2D openingScreen;
		Rectangle openignScreenRectangle;

		SpriteFont font;

		int yourBest = 0;

		public Game1 ()
		{
			graphics = new GraphicsDeviceManager (this);
			Content.RootDirectory = "Content";	            

			graphics.PreferredBackBufferWidth = GameConstanst.WINDOW_WIDTH;
			graphics.PreferredBackBufferHeight = GameConstanst.WINDOW_HEIGHT;

			IsMouseVisible = true;
		}

		/// <summary>
		/// Allows the game to perform any initialization it needs to before starting to run.
		/// This is where it can query for any required services and load any non-graphic
		/// related content.  Calling base.Initialize will enumerate through any components
		/// and initialize them as well.
		/// </summary>
		protected override void Initialize ()
		{
			// TODO: Add your initialization logic here
			base.Initialize ();
				
		}

		/// <summary>
		/// LoadContent will be called once per game and is the place to load
		/// all of your content.
		/// </summary>
		protected override void LoadContent ()
		{
			// Create a new SpriteBatch, which can be used to draw textures.
			spriteBatch = new SpriteBatch (GraphicsDevice);

			//TODO: use this.Content to load your game content here
			openingScreen = Content.Load<Texture2D>("memory");
			openignScreenRectangle = new Rectangle ((GameConstanst.WINDOW_WIDTH/2) - (openingScreen.Width / 2) ,(GameConstanst.WINDOW_HEIGHT/2) - (openingScreen.Height/2), openingScreen.Width, openingScreen.Height);

			font = Content.Load <SpriteFont> ("Arial20");

			Texture2D buttonSpriteExit = Content.Load<Texture2D> ("exit");
			Vector2 exitPos = new Vector2 (GameConstanst.WINDOW_WIDTH-GameConstanst.MARGIN_WIDTH-buttonSpriteExit.Width/2,GameConstanst.MARGIN_HEIGHT_TOP/3);
			buttonExit = new Button (buttonSpriteExit, exitPos, GameState.Exit );
			Texture2D buttonSpriteNew = Content.Load<Texture2D> ("new_game");
			buttonGame = new Button (buttonSpriteNew, new Vector2 (exitPos.X - GameConstanst.MARGIN_WIDTH - buttonSpriteNew.Width/2, GameConstanst.MARGIN_HEIGHT_TOP/3), GameState.ReStart);


			NewGame();


		} 

		/// <summary>
		/// Allows the game to run logic such as updating the world,
		/// checking for collisions, gathering input, and playing audio.
		/// </summary>
		/// <param name="gameTime">Provides a snapshot of timing values.</param>
		protected override void Update (GameTime gameTime)
		{

			KeyboardState key = Keyboard.GetState();
			if (key.IsKeyDown (Keys.Enter)) {
				gameState = GameState.Play;
			}

			if (key.IsKeyDown (Keys.Escape)) {
				this.Exit ();
			}

			if (GameState.Play == gameState) {
				MouseState mouse = Mouse.GetState ();
				board.Update (gameTime, mouse); 
				buttonExit.Update (mouse);
				buttonGame.Update (mouse);
			}

			if (GameState.Exit == gameState) {
				this.Exit(); 
			}

			if (GameState.ReStart == gameState) {
				if (yourBest == 0 || yourBest > board.Count) {
					yourBest = board.Count;
				}
				NewGame ();
				gameState = GameState.Play;
			}
			// TODO: Add your update logic here			
			base.Update (gameTime);


		}

		/// <summary>
		/// This is called when the game should draw itself.
		/// </summary>
		/// <param name="gameTime">Provides a snapshot of timing values.</param>
		protected override void Draw (GameTime gameTime)
		{
			graphics.GraphicsDevice.Clear (Color.Orange);
		
			//TODO: Add your drawing code here
			spriteBatch.Begin();
			if (gameState == GameState.Menu) {
				spriteBatch.Draw (openingScreen, openignScreenRectangle, Color.White);
				spriteBatch.DrawString (font, "PLAY: Press Enter\n QUIT: Press Esc", new Vector2 (GameConstanst.WINDOW_WIDTH/ 2  , GameConstanst.WINDOW_HEIGHT/4 +  GameConstanst.WINDOW_HEIGHT/2), Color.White);
			} else if (gameState == GameState.Play) {
				spriteBatch.DrawString(font, "Your Best: " + yourBest , new Vector2( GameConstanst.MARGIN_WIDTH_TOP, GameConstanst.MARGIN_HEIGHT_TOP/6 + GameConstanst.MARGIN_HEIGHT_TOP/2), Color.White);
				buttonExit.Draw (spriteBatch);
				buttonGame.Draw (spriteBatch);
				board.Draw (spriteBatch);
			}

			spriteBatch.End ();
			base.Draw (gameTime);
		}

		public void NewGame (){

			board = new Board (Content, new List<int> (GameConstanst.NUM_CARDS), new Vector2 ((GameConstanst.WINDOW_WIDTH - (GameConstanst.MARGIN_WIDTH * 2))/ GameConstanst.COLUMNS , (GameConstanst.WINDOW_HEIGHT - (GameConstanst.MARGIN_HEIGHT * 2))/GameConstanst.ROWS));

		}

		public static void ChangeState(GameState newState){
			gameState = newState;
		}

	}
}

