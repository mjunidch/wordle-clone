import { DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CountdownTimerComponent } from './components/countdown-timer/countdown-timer.component';
import { GameIconComponent } from './components/game-icon/game-icon.component';
import { GameKeyboardComponent } from './components/game-keyboard/game-keyboard.component';
import { GameModalComponent } from './components/game-modal/game-modal.component';
import { GameRowComponent } from './components/game-row/game-row.component';
import { GameSettingsComponent } from './components/game-settings/game-settings.component';
import { GameStatComponent } from './components/game-stat/game-stat.component';
import { GameSwitchComponent } from './components/game-switch/game-switch.component';
import { GameThemeManagerComponent } from './components/game-theme-manager/game-theme-manager.component';
import { GameTileComponent } from './components/game-tile/game-tile.component';
import { GameToastComponent } from './components/game-toast/game-toast.component';

@NgModule({
  declarations: [
    AppComponent,
    GameThemeManagerComponent,
    GameRowComponent,
    GameTileComponent,
    GameIconComponent,
    GameModalComponent,
    GameSettingsComponent,
    GameKeyboardComponent,
    GameSwitchComponent,
    CountdownTimerComponent,
    GameToastComponent,
    GameStatComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
