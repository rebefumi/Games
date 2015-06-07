using System;

using Microsoft.Xna.Framework;
using Microsoft.Xna.Framework.Graphics;
using Microsoft.Xna.Framework.Input;

namespace Pong
{
	/// <summary>
	/// A ball
	/// </summary>
	public class Ball
	{
		#region Fields
		const int INITIAL_VEL = 450;

		Texture2D ball;
		Rectangle drawRectangle;

		Vector2 ballSpeed; 
		int radius;

		int limitX;
		int limitY;
		int centerX;
		int centerY;

		Score score;

		Random rand = new Random();

		#endregion

		#region Constructors
		public Ball (Texture2D mball, int windowWidth, int windowHeight, Score initialScore){

			score = initialScore;

			centerX = (windowWidth / 2);
			centerY = (windowHeight / 2);

			ball = mball;
			drawRectangle = new Rectangle (centerX - (ball.Width / 2), centerY - (ball.Height / 2), ball.Width, ball.Height);

			limitX = windowWidth - drawRectangle.Width;
			limitY = windowHeight - drawRectangle.Height;

			radius = ball.Width / 2;

			randomSpeed();
		}
		#endregion

		#region Properties
		public Rectangle Collision {
			get { return drawRectangle; }
		}

		public float SpeedX{
			set {
				ballSpeed.X = value;
			}

			get {
				return ballSpeed.X;
			}
		}

		public float SpeedY {
			set{
				ballSpeed.Y = value;
			}

			get{
				return ballSpeed.Y;
			}
		}

		public Rectangle DrawRectangle{
			get{
				return drawRectangle;
			}
		}

		public int Radius {
			get { 
				return radius;
			}
		}

		#endregion

		#region Methods
		public void randomSpeed (){
			double angle = MathHelper.ToRadians(rand.Next (20, 60));
			ballSpeed.X = randomDirection() * (float)Math.Cos(angle) * INITIAL_VEL;
			ballSpeed.Y = randomDirection() * (float)Math.Sin(angle) * INITIAL_VEL;
		}

		public int randomDirection (){
			int dir = rand.Next (-1, 2);
			while (dir == 0) {
				dir = rand.Next (-1, 2);
			}
			return dir;
		}
			
		/// <summary>
		/// Update the ball speed and position
		/// </summary>
		/// <param name="gameTime">Game time.</param>
		public void Update (GameTime gameTime){
			drawRectangle.X += (int)(ballSpeed.X * gameTime.ElapsedGameTime.TotalSeconds);
			drawRectangle.Y += (int)(ballSpeed.Y * gameTime.ElapsedGameTime.TotalSeconds);

			//If the ball outs for the left or right. Stars again in the center of the window
			if (drawRectangle.X > limitX || drawRectangle.X < 0) {
				if (drawRectangle.X < 0) {
					score.ScoreRed  = score.ScoreRed + 1;
				} else {
					score.ScoreWhite = score.ScoreWhite + 1;
				}

				//reset de position to the center
				drawRectangle.X = centerX - (ball.Width / 2);
				drawRectangle.Y = centerY - (ball.Height / 2);

				//reset at initial speed
				randomSpeed ();
			}
			//If the ball outs for the top or bottom, it bounces
			if (drawRectangle.Y > limitY || drawRectangle.Y < 0) {
				ballSpeed.Y *= -1;
			}
		}

		/// <summary>
		/// Draws the ball
		/// </summary>
		/// <param name="spriteBatch">sprite batch</param>
		public void Draw(SpriteBatch spriteBatch)
		{
			spriteBatch.Draw(ball, drawRectangle, Color.White);

		}
			
		#endregion
	}
}
